import Menu from './Menu'

export default function Private({text}) {
  return (
    <main>
      <Menu />
      <section>
        <h1>{text}</h1>
      </section>
    </main>
  )
}