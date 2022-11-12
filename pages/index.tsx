import { useCircuit } from "contexts/circuit/context"

export default function Home() {
  const circuit = useCircuit()

  console.log(circuit)

  return <>Hello world</>
}
