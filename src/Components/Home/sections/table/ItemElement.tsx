type Props = {
  item: any;
  idx: number;
};

export default function ItemElement({item, idx}: Props) {
  const color = item?.color?.color ? item?.color?.color : "";
  return (
    <tr key={idx}>
      <td className="border pl-12 p-2">
        {idx + 1}. <span className="text-blue-500">{item.name}</span>
      </td>
      <td className="border p-2 text-center">
        {color && (
          <span
            style={{
              backgroundColor: color,
            }}
            className={`flex mx-auto w-4 h-4 rounded-full`}
          ></span>
        )}
      </td>
      <td className="border p-2">{item.unit}</td>
      <td className="border p-2">{item.code}</td>
      <td className="border p-2">{item.last_price}</td>
      <td className="border p-2">{item.remind_start_amount}</td>
      <td className="border p-2">{item.remind_start_sum}</td>
      <td className="border p-2">{item.remind_income_amount}</td>
      <td className="border p-2">{item.remind_income_sum}</td>
      <td className="border p-2">{item.remind_outgo_amount}</td>
      <td className="border p-2">{item.remind_outgo_sum}</td>
      <td className="border p-2">{item.remind_end_amount}</td>
      <td className="border p-2">{item.remind_end_sum}</td>
    </tr>
  );
}
