import { Client } from './types/client'

export const replaceAtIndex = (
    arr: Client[],
    index: number,
    newValue: Partial<Client>
) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}
