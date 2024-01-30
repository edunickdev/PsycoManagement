import Field from "./field";

const AnnotationItem = () => {
  return (
    <>
      <div className="col-span-12 bg-orange-200 h-44 p-3 rounded-md text-tiny flex flex-col overflow-y-auto my-1">
        <span className="font-semibold py-1">Fecha: </span>
        <span className="font-semibold py-1 mb-1">Responsable: </span>
        <Field />
        <Field />
        <Field />
      </div>
    </>
  );
};

export default AnnotationItem;
