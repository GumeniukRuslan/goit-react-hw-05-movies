import { CastMember } from "components/CastMember/CastMember"
import { getCast } from "helpers/api";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { STATUS } from "constants/constants";
import { Error } from "components/Error/Error";
import { Loader } from "components/Loader/Loader";
import { Message } from "components/Message/Message";


export const Cast = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    setStatus(STATUS.PENDING)
    try {
      (async () => {  
        const data = await getCast(movieId)
        setCast(data.cast)
        setStatus(STATUS.RESOLVED)
      })();
    } catch {
      setStatus(STATUS.REJECTED)
    }
  }, [movieId])

  return (
    <>
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED
        ? (cast.length ? <ul>{cast && cast.map(member => <CastMember key={member.id} member={member} />)}</ul> : <Message text="Ninja clan" />)
        : <></>}
      {status === STATUS.REJECTED && <Error/>}
    </>
  )
  
  
  
  
}