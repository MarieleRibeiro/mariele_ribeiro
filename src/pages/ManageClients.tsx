import { useQuery } from 'react-query'
import { api } from '../components/api'
import { Client } from '../types/client'
import { useManageClients } from '../hooks/useManageClients'
import { useState } from 'react'
import { ColumnsType } from 'antd/lib/table'
import { FiEdit2, FiTrash } from 'react-icons/all'
import {
    ButtonActions,
    Container,
    TableActions,
    IconButton,
    FieldContainer,
    Wrapper,
    TableOverflow,
} from './ManageClients.styles'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Modal, Table } from 'antd'
import { Footer } from '../components/Footer'
import { useForm } from 'react-hook-form'

export function ManageClients() {
    const { data, isLoading } = useQuery('clients', async () =>
        api.get<Client[]>('clients')
    )
    const { deleteClient, updateClient, addClient } = useManageClients()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [search, setSearch] = useState('')

    const {
        reset,
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            id: '',
            email: '',
            phone: '',
            company: '',
            address: '',
            note: '',
            status: true,
        },
    })

    if (isLoading) return <>Carregando...</>
    if (!data) return null

    const dataSource = data.data
        .map((item) => ({
            ...item,
            status: item.isActive,
        }))
        .filter(
            (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.company.toLowerCase().includes(search.toLowerCase()) ||
                item.phone.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase())
        )

    const toggleModal = () => setIsModalVisible((prev) => !prev)

    const onCloseModal = () => {
        setIsModalVisible(false)
        reset()
    }

    const renderActions = (_: string, record: Client) => {
        return (
            <ButtonActions>
                <IconButton
                    onClick={() => {
                        setValue('name', record.name)
                        setValue('company', record.company)
                        setValue('phone', record.phone)
                        setValue('email', record.email)
                        setValue('address', record.address)
                        setValue('note', record.note)
                        setValue('id', record.id)
                        setValue('status', record.isActive)
                        toggleModal()
                    }}
                >
                    <FiEdit2 size={16} />
                </IconButton>
                <IconButton onClick={async () => onRemoveClient(record.id)}>
                    <FiTrash size={16} />
                </IconButton>
            </ButtonActions>
        )
    }

    const columns: ColumnsType<Client> = [
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: renderActions,
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Empresa',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            key: 'phone',
            render: (value) => <div style={{ minWidth: '160px' }}>{value}</div>,
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

    const onCreateClient = (payload: Client) => {
        try {
            addClient.mutate(payload)
            toggleModal()
        } catch (e) {
            console.log(e)
        }
    }

    const onUpdateClient = (payload: Client) => {
        try {
            updateClient.mutate(payload)
            toggleModal()
        } catch (e) {
            console.log(e)
        }
    }

    const onRemoveClient = async (id: string) => {
        try {
            deleteClient.mutate(id)
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = handleSubmit((data) => {
        const { name, company, phone, email, address, note, id } = data

        const payload: Client = {
            id: id !== '' ? id : Math.random().toString(),
            name,
            company,
            email,
            phone,
            address,
            note,
            isActive: data.status ? data.status : true,
        }

        const clientExists = id
        if (clientExists) {
            onUpdateClient(payload)
            reset()
            return
        }

        onCreateClient(payload)
        reset()
    })

    return (
        <Container>
            <Header />
            <Wrapper>
                <TableActions>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={
                            'Pesquise por nome, telefone, empresa ou email'
                        }
                    />
                    <Button onClick={toggleModal}>
                        Adicionar novo Cliente
                    </Button>
                </TableActions>
                <Modal
                    title="Dados do Cliente"
                    visible={isModalVisible}
                    onOk={onSubmit}
                    onCancel={onCloseModal}
                >
                    <div>
                        <form
                            onSubmit={(formEvent) => formEvent.preventDefault()}
                        >
                            <FieldContainer>
                                <input
                                    placeholder="Nome"
                                    required
                                    data-error={Boolean(errors?.name)}
                                    {...register('name', {
                                        required: true,
                                        maxLength: 20,
                                    })}
                                />
                                <input
                                    placeholder="Empresa"
                                    {...register('company')}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <input
                                    required
                                    placeholder="E-mail"
                                    type={'email'}
                                    data-error={Boolean(errors?.email)}
                                    {...register('email', {
                                        required: true,
                                    })}
                                />
                                <input
                                    placeholder="Telefone"
                                    {...register('phone')}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <input
                                    placeholder="Endereço"
                                    {...register('address')}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <textarea
                                    rows={6}
                                    placeholder="Notas"
                                    {...register('note')}
                                />
                            </FieldContainer>
                        </form>
                    </div>
                </Modal>

                <TableOverflow>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                    />
                </TableOverflow>
            </Wrapper>
            <Footer />
        </Container>
    )
}
