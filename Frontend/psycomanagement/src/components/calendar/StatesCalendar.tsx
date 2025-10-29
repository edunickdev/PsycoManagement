import { Card, CardHeader, CardBody, CardFooter, ScrollShadow } from "@nextui-org/react";

const StatesCalendar = (): JSX.Element => {
  return (
    <div className="col-span-2 mt-32 mr-8">
      <Card className="max-w-[340px] max-h-[450px] border bg-slate-50" radius="sm" shadow="none">
        <CardHeader className="justify-between">
          <h1 className="font-bold">Estados Calendario: </h1>
        </CardHeader>
        <ScrollShadow className="h-[336px]">
          <CardBody className="px-3 py-0 text-small text-default-400 my-2">
            <p></p>
          </CardBody>
        </ScrollShadow>
        <CardFooter className="gap-3 justify-center p-6">
          <p>Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatesCalendar;