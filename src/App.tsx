/* eslint-disable */
import * as Xlsx from "xlsx";

function App() {
  const handleClick = async () => {
    try {
      const response = await (
        await fetch(
          "https://theunitedstates.io/congress-legislators/executive.json"
        )
      ).json();
      const prez = response.filter((row: any) =>
        row.terms.some((term: any) => term.type === "prez")
      );
      const rows = prez.map((row: any) => ({
        name: row.name.first + " " + row.name.last,
        birthday: row.bio.birthday,
      }));
      let worksheet = Xlsx.utils.aoa_to_sheet([
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"],
      ]);

      Xlsx.utils.sheet_add_json(worksheet, rows, { origin: "A5" });
      //const worksheet = Xlsx.utils.json_to_sheet(rows, { origin: "A3" });
      // const newWorksheet = Xlsx.utils.sheet_add_aoa(
      //   worksheet,
      //   [["Name", "Birthday"]],
      //   { origin: "A1" }
      // );
      //newWorksheet["!cols"] = [{ wch: 10 }];
      const workbook = Xlsx.utils.book_new();
      Xlsx.utils.book_append_sheet(workbook, worksheet, "Dates");
      Xlsx.writeFile(workbook, "dates.xlsx");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="">
      <button onClick={handleClick}>엑셀 다운로드</button>
    </div>
  );
}

export default App;
