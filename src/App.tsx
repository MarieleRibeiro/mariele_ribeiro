import 'antd/dist/antd.css'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './styles/colors'
import { Footer } from './components/Footer'
import { Modal, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FiEdit2, FiTrash } from 'react-icons/all'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import { api } from './components/api'
import { Button } from './components/Button'
import { useRef, useState } from 'react'
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
const Wrapper = styled.main`
    padding: 2rem;
`
const ContentButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    margin-bottom: 1rem;
`
const Input = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;
    input:nth-child(2) {
        margin-left: 1rem;
    }
    input {
        width: 100%;
        padding: 0.3rem;
    }
    textarea {
        width: 100%;
    }
`

const queryClient = new QueryClient()

function ManageClients() {
    const { data, isLoading } = useQuery('clients', async () =>
        api.get<DataType[]>('clients')
    )

    const [selectedClient, setSelectedClient] = useState<DataType | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [search, setSearch] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    if (isLoading) {
        return <>Carregando...</>
    }

    if (!data) {
        return null
    }

    const dataSource = data.data
        .map((item) => ({
            ...item,
            status: item.isActive,
        }))
        .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )

    const toggleModal = () => {
        setIsModalVisible((prev) => !prev)
    }

    const removeClient = async (id: string) => {
        try {
            await api.delete('/clients/' + id)
            queryClient.invalidateQueries('clients')
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
                            size={16}
                            onClick={() => {
                                setSelectedClient(record)
                                toggleModal()
                            }}
                        />
                        <FiTrash
                            size={16}
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
            render: (value) => <>{value === true ? 'Ativo' : 'Inativo'}</>,
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
                    queryClient.invalidateQueries('clients')
                    return
                } catch (e) {
                    console.log(e)
                }
            }

            try {
                await api.post('clients', payload)
                queryClient.invalidateQueries('clients')
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Container>
            <Header />
            <Wrapper>
                <ContentButton>
                    <Button onClick={toggleModal}>
                        Adicionar novo Cliente
                    </Button>
                </ContentButton>
                <Modal
                    title="Dados do Cliente"
                    visible={isModalVisible}
                    onOk={onCreateClient}
                    onCancel={toggleModal}
                >
                    <div>
                        <form
                            ref={formRef}
                            onSubmit={(formEvent) => formEvent.preventDefault()}
                        >
                            <Input>
                                <input
                                    defaultValue={selectedClient?.name}
                                    placeholder="Nome"
                                    required
                                    name={'name'}
                                />
                                <input
                                    defaultValue={selectedClient?.company}
                                    placeholder="Empresa"
                                    name={'company'}
                                />
                            </Input>
                            <Input>
                                <input
                                    defaultValue={selectedClient?.email}
                                    required
                                    placeholder="E-mail"
                                    type={'email'}
                                    name={'email'}
                                />
                                <input
                                    defaultValue={selectedClient?.phone}
                                    placeholder="Telefone"
                                    type={'number'}
                                    name={'phone'}
                                />
                            </Input>
                            <Input>
                                <input
                                    placeholder="Endereço"
                                    defaultValue={selectedClient?.address}
                                    name={'address'}
                                />
                            </Input>
                            <Input>
                                <textarea
                                    rows={6}
                                    defaultValue={selectedClient?.note}
                                    placeholder="Notas"
                                    name={'note'}
                                />
                            </Input>
                        </form>
                    </div>
                </Modal>
                <Table dataSource={dataSource} columns={columns} />
            </Wrapper>
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
