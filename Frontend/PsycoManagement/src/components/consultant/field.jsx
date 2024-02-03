const Field = () => {
  return (
    <div className="flex flex-col p-1 bg-green-200 rounded-md my-1">
      <span className="font-semibold p-1">Campo: </span>
      <span className="font-semibold p-1 text-red-600">Valor anterior: </span>
      <span className="font-semibold p-1 text-green-800">Valor nuevo: </span>
    </div>
  );
};

export default Field;
