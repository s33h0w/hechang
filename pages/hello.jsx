function HelloWorld({name}) {
    return <div>Hello, {name}</div>
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/hello')
    const hello = await res.json()
    return {
        props: {
            name: hello.name
        }
    }
}

export default HelloWorld
