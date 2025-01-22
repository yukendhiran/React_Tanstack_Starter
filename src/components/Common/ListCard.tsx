import { Card } from "@/components/ui/card"; // Assuming Card has a React-compatible type
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { logger } from "@/lib/logger";
import { usePaginationStore } from "@/store/pagination/paginationStore";
import { useSearchStore } from "@/store/search/searchStore";
import { useMemo } from "react";
import { LabeledInputWithIcon } from "../ui/LabeledInputWithIcon";

interface ListCardProps<D> {
  data: D[];
  keys: string[];
  setCurrent: (item: D) => void;
  logid: string;
  setId: (id: number | undefined) => void;
  totalPages?: number;
}

interface ItemType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function ListCard<D extends object>({
  data,
  keys,
  setCurrent,
  logid,
  setId,
  totalPages,
}: ListCardProps<D>) {
  const { search, setSearch } = useSearchStore();
  const { page, setPage } = usePaginationStore();

  const handleClick = (item: D) => {
    logger.log(`${logid} clicked DATA`, item);
    setCurrent(item);

    if (keys.length > 0 && keys[0] in item) {
      // @ts-expect-error id will be number mostly
      const idValue = item[keys[0]] as number | undefined;

      setId?.(idValue);
      logger.log(`${logid} clicked ID`, idValue);
    } else {
      logger.error("Invalid key or value in the item:", item, keys[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    logger.log("Search Input Change", e.target.value);
    logger.log("Search Store", search);
  };

  const filteredData = useMemo(
    () =>
      data.filter((item) => {
        const value = (item as { [key: string]: string })[keys[1]];
        return (
          typeof value === "string" &&
          value?.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [keys, search, data],
  );

  const handlePageChange = (currentPage: number) => {
    if (currentPage > 0 && totalPages && currentPage <= totalPages) {
      setPage(currentPage);
    }
  };

  logger.log("filteredData", filteredData);

  return (
    <div className="lg:w-1/4">
      <Card className="h-[70vh] flex-1 overflow-y-auto p-5">
        <LabeledInputWithIcon
          id="search"
          value={search}
          iconName="mdi:search"
          onChange={onChange}
          placeholder="Search"
        />
        <div className="mt-5">
          {filteredData?.map((item) => (
            <li
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              key={(item as ItemType)[keys[0]]}
              onClick={() => {
                return handleClick(item);
              }}
              className="flex items-center justify-between rounded-lg p-2 hover:cursor-pointer hover:bg-gray-200"
            >
              <div>
                <p className="text-md">{(item as ItemType)[keys[1]]}</p>
                <div className="text-sm text-gray-500">
                  <p>{(item as ItemType)[keys[2]]}</p>
                  <p>{(item as ItemType)[keys[3]]}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </Card>
      <div className="mt-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
            </PaginationItem>
            <PaginationItem>
              <div>{page}</div>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
