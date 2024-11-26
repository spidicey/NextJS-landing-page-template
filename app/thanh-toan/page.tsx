import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function DemoPaymentMethod() {
    
  return (
    <div className="flex h-screen items-center  justify-center">
      <Tabs defaultValue="VNPAY">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="VNPAY">
            <Image src="/VNPAY.svg" width={100} height={100} alt="Card Icon" />
            Thanh Toán online
          </TabsTrigger>
          <TabsTrigger value="TIền mặt">
            <Image src="/cash.svg" width={30} height={30} alt="Card Icon" />
            Tiền mặt
          </TabsTrigger>
        </TabsList>
        <TabsContent value="VNPAY">
          <Card>
            <CardHeader>
              <CardTitle>Thanh Toán </CardTitle>
              <CardDescription>Thanh toán online bằng vnpay.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="TIền mặt">
          <Card>
            <CardHeader>
              <CardTitle>TIền mặt</CardTitle>
              <CardDescription>Thanh toán tiền mặt khi nhận hàng.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current TIền mặt</Label>
                <Input id="current" type="TIền mặt" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New TIền mặt</Label>
                <Input id="new" type="TIền mặt" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save TIền mặt</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
