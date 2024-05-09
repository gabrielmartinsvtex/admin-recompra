import React, { useState } from 'react';
import { mockPedidos } from './mock';

interface Pedido {
  orderId: string;
  creationDate: string;
  // Adicione outras propriedades conforme necessário
}

const AdminRecompra = () => {
  const [email, setEmail] = useState('');
  const [data, setData] = useState<{ list: Pedido[] } | null>(null);
  const [diferencaEntreDatas, setDiferencaEntreDatas] = useState<
    number[] | null
  >(null);

  // TO DO
  // Verificar autenticacao, porque o VtexIdclientAutCookie é httpOnly e nao da pra pegar do window
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/oms/pvt/orders?q=${encodeURIComponent(email)}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'VtexIdclientAutCookie':
            'eyJhbGciOiJFUzI1NiIsImtpZCI6IjgwOTVDRkExMDc3MDM4OTY2NTJCRkRGMEIyMEM4OUJFOUYwODMwQ0UiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJnYWJyaWVsLm1hcnRpbnNAdnRleC5jb20iLCJhY2NvdW50Ijoic3F1YWRncm93IiwiYXVkaWVuY2UiOiJhZG1pbiIsInNlc3MiOiIyYjViN2NiYy0wMTUwLTRhYzQtYmJjYi1lNTQzY2E2OWM0NWQiLCJleHAiOjE3MTUyODAzMzEsInR5cGUiOiJ1c2VyIiwidXNlcklkIjoiOGFlYTNkMzItNmQ5Ni00NmJmLTlkMWQtMjExMGZhZGMzZjg5IiwiaWF0IjoxNzE1MTkzOTMxLCJpc3MiOiJ0b2tlbi1lbWl0dGVyIiwianRpIjoiNDQyOGRiZGMtNTc3YS00ZGU5LTg2NDQtOTIzYzAzNDQzMjdiIn0.72qWkaVzjJ8R7VTE1a6HpK314L_mzvv0PizWRtWvQ7lh_bs04yXSxkqcbGai-iJXCh4sqhKOSYCbqrUQn5__Zw',
          Cookie: 'janus_sid=781beebe-6562-4cb0-8d29-cd80c0b34fc2',
        },
      });
      let jsonData = await response.json();
      jsonData = mockPedidos; // AQUI ENTRA O MOCK DE TROUSSEAU - REMOVENDO ESSA LINHA DEVE PEGAR DO EMAIL QUE FOI INSERIDO
      setData(jsonData);

      if (jsonData && jsonData.list.length > 1) {
        const diferenca = calcularDiferencaEntreDatas(jsonData.list);
        console.log('Diferença entre datas:', diferenca);
        setDiferencaEntreDatas(diferenca);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calcularDiferencaEntreDatas = (data: Pedido[] | null) => {
    if (!data || data.length === 0) {
      return null;
    }

    const diferencaEntreDatas: number[] = [];

    for (let i = 0; i < data.length - 1; i++) {
      const dataAtual = new Date(data[i].creationDate);
      const proximaData = new Date(data[i + 1].creationDate);

      const diferencaEmMS = proximaData.getTime() - dataAtual.getTime();
      const dias = Math.floor(diferencaEmMS / (1000 * 60 * 60 * 24));

      diferencaEntreDatas.push(Math.abs(dias));
    }

    return diferencaEntreDatas;
  };

  const formatDate = (date: string) => {
    const dataString = date;
    const data = new Date(dataString);

    const dia = data.getDate().toString().padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const minutos = data.getMinutes().toString().padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const segundos = data.getSeconds().toString().padStart(2, '0'); // Adiciona um zero à esquerda se necessário

    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;

    console.log(dataFormatada); // Saída: "08/05/2024 19:07:16"
    return dataFormatada
  }

  const handleConsultar = async () => {
    await fetchData();
  };

  console.log(data, "data1")
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Insira o e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleConsultar}>Consultar</button>
      </div>
      {data !== null && (
        <div>
          {data.list.length ?
            <ul>
              <h2>Pedidos</h2>
              {data.list.map((pedido: Pedido, index: number) => (
                <li key={pedido.orderId}>
                  <strong>Id do Pedido:</strong> {pedido.orderId},{' '}
                  <strong>Data do Pedido:</strong> {formatDate(pedido.creationDate)}
                  {diferencaEntreDatas && index > 0 && (
                    <span>
                      {'  -  '}
                      {diferencaEntreDatas[index - 1]} dias desde o pedido anterior
                    </span>
                  )}
                </li>
              ))}
            </ul> : <>Nenhum pedido encontrado!</>}
        </div>
      )}
    </>
  );
};

export default AdminRecompra;
