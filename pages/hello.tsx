import { GetStaticProps } from 'next'

function HelloWorld({name}) {
    return <div>Hello, {name}</div>
}

export const getStaticProps: GetStaticProps<{name: any}> = async () => {
    const res = await fetch('http://localhost:3000/api/hello')
    const hello = await res.json()
    return {
        props: {
            name: hello.name
        }
    }
}

export default HelloWorld
