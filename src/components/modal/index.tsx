import { component$, useContext, useSignal, useStore } from "@builder.io/qwik";
import { MyContext } from "~/routes/layout";



export default component$(() => {
  const state = useStore({
    affirmation: ''
  })
  const author = useSignal('')
  const data = useContext(MyContext)



  return (
    <div class="fixed top-0 left-0 w-screen h-screen bg-slate-900 p-2">
      <p class="p-1">Add an Affirmation (<i class="text-xs">add a space and a '-' before the author</i>)</p>
      <div class="flex flex-grid p-1 gap-2">
        <input class="text-slate-400" placeholder="Enter affirmation" onInput$={(e) => {
            state.affirmation = e.target.value
          }} />
        <input class="text-slate-400" bind:value={author} placeholder="Author"/>
        <button onClick$={() => {
          if (!author.value || !state.affirmation) {
            return
          }
          data.affirmations = [...data.affirmations, [state.affirmation, author.value]]
          data.openModal = false
        }}>Save</button>
      </div>
      <hr/>
      <div class="flex flex-col gap-1">
        {data.affirmations.map((affirmation, affIndex) => {
          return (
            <div key={affIndex}>
              {affirmation}
            </div>
          )

        })}

      </div>
    </div>
  );
});


