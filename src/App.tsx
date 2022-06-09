import 'antd/dist/antd.css'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './styles/colors'
import { Footer } from './components/Footer'
import { Modal, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FiEdit2, FiTrash } from 'react-icons/all'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import { api } from './components/api'
import { Header } from './components/Header'
import { Button } from './components/Button'
import { useRef, useState } from 'react'

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
    const { data, isLoading } = useQuery('clients', async () =>
        api.get<DataType[]>('clients')
    )

    const [selectedClient, setSelectedClient] = useState<DataType | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

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

    const toggleModal = () => {
        setIsModalVisible((prev) => !prev)
    }

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
                        <FiEdit2
                            onClick={() => {
                                setSelectedClient(record)
                                toggleModal()
                            }}
                        />
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

    const onCreateClient = async () => {
        if (formRef.current !== null) {
            const formData = new FormData(formRef.current)
            const payload = {
                id: 2,
                name: formData.get('name'),
                company: formData.get('company'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                note: formData.get('note'),
                isActive: true,
            }

            if (selectedClient?.id) {
                try {
                    await api.put(`/clients/${selectedClient.id}`, payload)
                    return
                } catch (e) {
                    console.log(e)
                }
            }

            try {
                await api.post('clients', payload)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Container>
            <Header />
            <Button onClick={toggleModal}>Adicionar novo Cliente</Button>
            <Modal
                title="Dados do Cliente"
                visible={isModalVisible}
                onOk={onCreateClient}
                onCancel={toggleModal}
            >
                <form
                    ref={formRef}
                    onSubmit={(formEvent) => formEvent.preventDefault()}
                >
                    <input
                        defaultValue={selectedClient?.name}
                        required
                        name={'name'}
                    />
                    <input
                        defaultValue={selectedClient?.company}
                        name={'company'}
                    />
                    <input
                        defaultValue={selectedClient?.email}
                        required
                        type={'email'}
                        name={'email'}
                    />
                    <input
                        defaultValue={selectedClient?.phone}
                        name={'phone'}
                    />
                    <input
                        defaultValue={selectedClient?.address}
                        name={'address'}
                    />
                    <textarea
                        defaultValue={selectedClient?.note}
                        name={'note'}
                    />
                </form>
            </Modal>
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
