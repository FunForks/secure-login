import Menu from './Menu'

export default function Public({text}) {
  return (
    <main>
      <aside>
        <Menu />
      </aside>
      <section>
        <h1>{text}</h1>
      </section>
    </main>
  )
}