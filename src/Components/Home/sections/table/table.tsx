import React, {useState, useMemo} from "react";
import ItemElement from "./ItemElement";
import type {ItemType} from "@/types/ItemType";

const initSums = () => ({
  remind_start_amount: 0,
  remind_start_sum: 0,
  remind_income_amount: 0,
  remind_income_sum: 0,
  remind_outgo_amount: 0,
  remind_outgo_sum: 0,
  remind_end_amount: 0,
  remind_end_sum: 0,
});

const addToSums = (target: any, item: any) => {
  Object.keys(target)?.forEach((key) => {
    target[key] += item[key] || 0;
  });
};

const groupDataWithSums = (data: any[]) => {
  const grouped: any = {};

  data?.forEach((item) => {
    const {parent, category} = item;

    if (!grouped[parent]) {
      grouped[parent] = {
        _total: initSums(),
        categories: {},
      };
    }

    if (!grouped[parent].categories[category]) {
      grouped[parent].categories[category] = {
        _total: initSums(),
        items: [],
      };
    }

    grouped[parent].categories[category].items.push(item);
    addToSums(grouped[parent].categories[category]._total, item);
    addToSums(grouped[parent]._total, item);
  });

  return grouped;
};

const Table = ({data}: {data: ItemType[]}) => {
  const grouped = useMemo(() => groupDataWithSums(data), [data]);
  const [openParents, setOpenParents] = useState<{[key: string]: boolean}>({});
  const [openCategories, setOpenCategories] = useState<{[key: string]: boolean}>({});

  const toggleParent = (parent: string) => {
    setOpenParents((prev) => ({...prev, [parent]: !prev[parent]}));
  };

  const toggleCategory = (parent: string, category: string) => {
    const key = `${parent}_${category}`;
    setOpenCategories((prev) => ({...prev, [key]: !prev[key]}));
  };

  const renderSums = (sum: any) => (
    <>
      <td className="border p-2">{sum.remind_start_amount}</td>
      <td className="border p-2">{sum.remind_start_sum}</td>
      <td className="border p-2">{sum.remind_income_amount}</td>
      <td className="border p-2">{sum.remind_income_sum}</td>
      <td className="border p-2">{sum.remind_outgo_amount}</td>
      <td className="border p-2">{sum.remind_outgo_sum}</td>
      <td className="border p-2">{sum.remind_end_amount}</td>
      <td className="border p-2">{sum.remind_end_sum}</td>
    </>
  );

  return (
    <table className="w-full border-collapse" border={1}>
      <thead>
        <tr className="bg-[#1D1D1D]">
          <th rowSpan={2} className="border p-2">
            Name
          </th>
          <th rowSpan={2} className="border p-2">
            Цвет
          </th>
          <th rowSpan={2} className="border p-2">
            Ед изм
          </th>
          <th rowSpan={2} className="border p-2">
            Артикул
          </th>
          <th rowSpan={2} className="border p-2">
            Цена учетная
          </th>
          <th colSpan={2} className="border p-2">
            Сальдо начало периода
          </th>
          <th colSpan={2} className="border p-2">
            Приход
          </th>
          <th colSpan={2} className="border p-2">
            Расход
          </th>
          <th colSpan={2} className="border p-2">
            Сальдо на конец периода
          </th>
        </tr>
        <tr className="bg-[#1D1D1D]">
          <th className="border p-2">Кол-во</th>
          <th className="border p-2">Сумма</th>
          <th className="border p-2">Кол-во</th>
          <th className="border p-2">Сумма</th>
          <th className="border p-2">Кол-во</th>
          <th className="border p-2">Сумма</th>
          <th className="border p-2">Кол-во</th>
          <th className="border p-2">Сумма</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([parent, parentData]: any) => (
          <React.Fragment key={parent}>
            <tr className="border font-semibold cursor-pointer">
              <td className="border p-2">
                <div className="flex items-center gap-2">
                  <span
                    className="border w-6 h-6 pb-1 leading-none flex items-center justify-center rounded-sm cursor-pointer"
                    onClick={() => toggleParent(parent)}
                  >
                    {openParents[parent] ? "−" : "+"}
                  </span>{" "}
                  {parent}
                </div>
              </td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              <td className="p-2 border"></td>
              {renderSums(parentData._total)}
            </tr>

            {openParents[parent] &&
              Object.entries(parentData.categories).map(([category, catData]: any) => {
                const key = `${parent}_${category}`;
                return (
                  <React.Fragment key={key}>
                    <tr className="cursor-pointer">
                      <td className="border pl-6  p-2 ">
                        <div className="flex items-center gap-2">
                          <span
                            className="border w-6 h-6 pb-1 leading-none flex items-center justify-center rounded-sm cursor-pointer"
                            onClick={() => toggleCategory(parent, category)}
                          >
                            {openCategories[key] ? "−" : "+"}
                          </span>{" "}
                          {category}
                        </div>
                      </td>
                      <td className="p-2 border"></td>
                      <td className="p-2 border"></td>
                      <td className="p-2 border"></td>
                      <td className="p-2 border"></td>
                      {renderSums(catData._total)}
                    </tr>

                    {openCategories[key] &&
                      catData.items.map((item: any, idx: number) => (
                        <ItemElement item={item} key={idx} idx={0} />
                      ))}
                  </React.Fragment>
                );
              })}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
