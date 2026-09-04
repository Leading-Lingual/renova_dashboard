import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pill from "../Pill";

const ListingOverviewTable = () => {
  return (
    <div className="border rounded-lg px-4">
      <Table aria-label="Listing">
        <TableHeader className="border-b-[0.5px] border-black-300">
          <TableRow>
            {[
              "Listing",
              "Material Type",
              "Price",
              "Status",
              "Listed on",
              "Action",
            ].map((item) => (
              <TableHead key={item} className="text-m-bold! font-bold!">
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Wireless Mouse</TableCell>
            <TableCell>metal</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <p className="text-m-bold">12,000</p>
                <p className="text-s">300 Per KG</p>
              </div>
            </TableCell>
            <TableCell>
              <Pill variant="accent">Pending</Pill>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-m-bold">May 18, 2026</p>
                <p className="text-s">10:26 pm</p>
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none">
                  <DropdownMenuItem className="rounded-none hover:bg-brand-50!">
                    Edit listing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-none hover:bg-brand-50!">
                    Delete lisiting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ListingOverviewTable;
