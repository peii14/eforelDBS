import axios from "axios";
import { toast } from "react-toastify";

export async function generateQuotationCounter(query: string) {
  const sales_quotation = await axios.get("/api/quotation", {
    params: { q: query, type: "totalQuotation" },
  });
  const quotationNumber = sales_quotation.data.map((value) =>
    value.quotation_num.split("-")
  );

  return sales_quotation.data.length < 10
    ? "00" + sales_quotation.data.length.toString()
    : sales_quotation.data.length < 100
    ? "0" + sales_quotation.data.length
    : sales_quotation.data.length;
}

export async function generateMOPCounter(query: string) {
  const sales_mop = await axios.get("/api/mop", {
    params: { q: query, type: "totalQuotation" },
  });
  return sales_mop.data.length < 10
    ? "00" + sales_mop.data.length.toString()
    : sales_mop.data.length < 100
    ? "0" + sales_mop.data.length
    : sales_mop.data.length;
}
