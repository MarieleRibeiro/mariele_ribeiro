import 'antd/dist/antd.css'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/colors'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ManageClients } from './pages/ManageClients'

export const queryClient = new QueryClient()

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
