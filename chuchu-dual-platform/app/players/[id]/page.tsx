import { useRouter } from "next/router";


const PlayerPage = () =>
{
  const router = useRouter();
  const { id } = router.query;



  return (
    <div>
      <h1>選手ID:{id}</h1>

    </div>
  )
}

export default PlayerPage;
