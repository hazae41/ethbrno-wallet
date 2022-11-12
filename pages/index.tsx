import { useCircuit } from "contexts/circuit/context"
import { WalletsPage } from "entities/wallets/all/page"

export default function Home() {
  const circuit = useCircuit()

  console.log(circuit)

  return <WalletsPage />
}
