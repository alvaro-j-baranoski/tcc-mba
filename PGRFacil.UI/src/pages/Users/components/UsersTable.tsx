import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/models/login/User";
import UsersTableDropdown from "./UsersTableDropdown";

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table className="w-full text-left border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead>
            <strong>Email</strong>
          </TableHead>
          <TableHead>
            <strong>Funções</strong>
          </TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-100">
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.roles.map((role) => (
                <Badge key={role} className="mr-2">{role}</Badge>
              ))}
            </TableCell>
            <TableCell className="text-right">
              <UsersTableDropdown user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
