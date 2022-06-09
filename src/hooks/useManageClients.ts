import { useMutation } from 'react-query'
import { api } from '../components/api'
import { queryClient } from '../App'
import { Client } from '../types/client'
import { replaceAtIndex } from '../utils'

export const useManageClients = () => {
    const deleteClient = useMutation({
        mutationFn: (id: string) => {
            return api.delete('/clients/' + id)
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries('clients')
            const previousClients =
                queryClient.getQueryData<Client[]>('clients')

            queryClient.setQueryData<{ data: Client[] }>('clients', (old) => {
                return {
                    ...old,
                    data:
                        old?.data.filter((item) => item.id !== variables) ?? [],
                }
            })
            return { previousClients }
        },
    })

    const addClient = useMutation({
        mutationFn: (payload: Client) => {
            return api.post('/clients/', payload)
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries('clients')
            const previousClients =
                queryClient.getQueryData<Client[]>('clients')

            queryClient.setQueryData<{ data: Client[] }>('clients', (old) => {
                return {
                    ...old,
                    data: [...(old?.data ?? []), variables],
                }
            })
            return { previousClients }
        },
    })

    const updateClient = useMutation({
        mutationFn: (payload: Partial<Client>) => {
            return api.put('/clients/' + payload.id, payload)
        },
        onMutate: async (newClient) => {
            await queryClient.cancelQueries(['clients', newClient.id])
            const previousClients = queryClient.getQueryData<{
                data: Client[]
            }>('clients')

            if (previousClients) {
                const newClients = replaceAtIndex(
                    previousClients.data,
                    previousClients?.data?.findIndex(
                        (item) => item.id === newClient.id
                    ),
                    newClient
                )

                queryClient.setQueryData('clients', { data: newClients })
            }
            return { previousClients }
        },
    })
    return {
        updateClient,
        deleteClient,
        addClient,
    }
}
