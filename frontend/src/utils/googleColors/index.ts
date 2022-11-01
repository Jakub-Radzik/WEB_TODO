export const eventColors = [
    {id:'1', background: '#a4bdfc', foreground: '#1d1d1d' },
    {id: '2', background: '#7ae7bf', foreground: '#1d1d1d' },
    {id: '3', background: '#dbadff', foreground: '#1d1d1d' },
    {id: '4', background: '#ff887c', foreground: '#1d1d1d' },
    {id: '5', background: '#fbd75b', foreground: '#1d1d1d' },
    {id: '6', background: '#ffb878', foreground: '#1d1d1d' },
    {id: '7', background: '#46d6db', foreground: '#1d1d1d' },
    {id: '8', background: '#e1e1e1', foreground: '#1d1d1d' },
    {id: '9', background: '#5484ed', foreground: '#1d1d1d' },
    {id: '10', background: '#51b749', foreground: '#1d1d1d' },
    {id: '11', background: '#dc2127', foreground: '#1d1d1d' }
]

export const getEventColor = (id: string) => {
    return eventColors.find(color => color.id === id)?.background || '#fff'
}