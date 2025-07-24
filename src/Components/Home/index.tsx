import {useService} from "@/hooks/use-service";
import {getReports} from "@/services/reports";
import {useEffect} from "react";
import Table from "./sections/table/table";
import type {ItemType} from "@/types/ItemType";

export default function HomeComponent() {
  const {data, isLoading, execute: fetchReports} = useService<ItemType[] | null>(getReports);
  const handleGetReports = async (params: Record<string, any> = {}) => {
    await fetchReports({...params});
  };
  useEffect(() => {
    handleGetReports({start: "2023-01-01", end: "2023-01-31"});
  }, []);

  return (
    <div className="w-full px-10 mt-10 pb-10">{isLoading ? <p>Loading...</p> : data && <Table data={data} />}</div>
  );
}
