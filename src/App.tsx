import 'antd/dist/antd.css'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './styles/colors'
import { Footer } from './components/Footer'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FiEdit2, FiTrash } from 'react-icons/all'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import { api } from './components/api'
import { Header } from './components/Header'

interface DataType {
    id: string
    guid: string
    name: string
    company: string
    email: string
    phone: string
    address: string
    note: string
    isActive: boolean
}

const Container = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
`

const queryClient = new QueryClient()

function ManageClients() {
    const { error, data, isLoading } = useQuery('clients', async () =>
        api.get<DataType[]>('clients')
    )

    if (isLoading) {
        return <>Carregando...</>
    }

    if (!data) {
        return null
    }

    const dataSource = data.data.map((item) => ({
        ...item,
        status: item.isActive,
    }))

    const removeClient = async (id: string) => {
        try {
            await api.delete('/clients/' + id)
        } catch (e) {
            console.log(e)
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (value, record) => {
                return (
                    <>
                        <FiEdit2 />
                        <FiTrash
                            onClick={async () => removeClient(record.id)}
                        />
                    </>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ]

    return (
        <Container>
            <Header />
            <Table dataSource={dataSource} columns={columns} />;
            <Footer />
        </Container>
    )
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <ManageClients />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
