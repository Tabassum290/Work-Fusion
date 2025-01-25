import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import Loader from '../../Components/Loader';

const Details = () => {
  const { id } = useParams();

  const axiosPublic = UseAxiosPublic();
  const { data: employee = [], isLoading, isError } = useQuery({
    queryKey: ['details', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/details/${id}`);
      return res.data.employee; 
    },
  });

  if (isLoading) {
    return <Loader/>;
  }

  const formattedData = employee.map((item) => ({
    ...item,
    monthYear: `${item.month} ${item.year}`,
  }));


  if (isError || !employee) {
    return <div>Error fetching employee details. Please try again.</div>;
  }
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <div className="p-8">
      <BarChart
      width={500}
      height={300}
      data={formattedData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey='monthYear' />
      <YAxis />
      <Bar dataKey="salary" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {formattedData.map((em, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart>
    </div>
  );
};

export default Details;
