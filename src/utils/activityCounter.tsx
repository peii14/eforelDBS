import axios from "axios";
import { toast } from "react-toastify";

export async function generateQuotationCounter(query: string) {
  const sales_quotation = await axios.get("/api/quotation", {
    params: { q: query, type: "totalQuotation" },
  });
  const quotationNumber = sales_quotation.data.map((value) =>
    value.quotation_num.split("-")
  );

  const total = Number(sales_quotation.data.length) + 1;

  return total < 10 ? "00" + total : total < 100 ? "0" + total : total;
}

export async function generateMOPCounter(query: string) {
  const sales_mop = await axios.get("/api/mop", {
    params: { q: query, type: "totalQuotation" },
  });
  const total = Number(sales_mop.data.length) + 1;
  return total < 10 ? "00" + total : total < 100 ? "0" + total : total;
}
