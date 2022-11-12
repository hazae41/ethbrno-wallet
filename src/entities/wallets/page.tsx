import { useCircuit } from "contexts/circuit/context"

export function WalletPage() {
  const circuit = useCircuit()

  console.log(circuit)

  return <>Hello world</>
}