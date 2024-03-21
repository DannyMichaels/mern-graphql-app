import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';

export default function Home() {
  const { data, loading, error } = useQuery(GET_ITEMS);

  return <div>Home</div>;
}
