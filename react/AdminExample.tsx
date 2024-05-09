import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import './styles.global.css'
import AdminRecompra from './UsersTable'

const AdminExample: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="Estatísticas de Recorrência" />}
        />
      }
    >
      <PageBlock variation="full">
        <AdminRecompra />
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
