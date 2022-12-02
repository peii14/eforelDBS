import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import moment, { Moment } from "moment";

const prisma = new PrismaClient();

async function main(){
    for(let i = 0; i < 10; i++){
        await prisma.verticalMarket.create({
            data:{
                verticalMarket_name:`${faker.company.companySuffix()}`,
                customer:{
                    create:{
                        customer_name:`${faker.name.fullName()}`,
                        customer_code:`dsfkl`,
                        customer_salesCode:`${faker.address.countryCode('alpha-2')}`,
                        customer_address:`${faker.address.streetAddress()}`,
                        customer_province:`${faker.address.country()}`,
                        customer_city:`${faker.address.city()}`,
                        customer_postalCode:`${faker.address.zipCode()}`,
                        customer_phone:`${faker.phone.number('+62 ### ## ##')}`,

                        PIC:{
                            create:{
                                pic_name:`${faker.name.fullName()}`,
                                pic_position:`Sales`,
                                pic_email:`${faker.internet.email()}`,
                                pic_phone:`${faker.phone.number('+62 ### ## ##')}`,
                                pic_sales_code:`${faker.address.countryCode('alpha-2')}`,
                            }
                        },
                        Quotation:{
                            create:{
                                quotation_num:`${faker.random.alphaNumeric(7)}`,
                                quotation_value:`${faker.commerce.product()}`,
                                quotation_product:`${faker.commerce.productName()}`,
                                quotation_quantity:Number(faker.random.numeric(1)),
        
                                MOP:{
                                    create:{
                                        mop_num:`${faker.random.alphaNumeric(7)}`,
                                        mop_value:`${faker.commerce.product()}`
                                    }
                                },
                                SalesPipeline:{
                                    create:{
                                        salesPipeline_date:new Date().toISOString().slice(0, 19).replace('T', ' '),
                                        salesPipeline_closeEstimation:new Date().toISOString().slice(0, 19).replace('T', ' '),
                                        salesPipeline_salesCode:`${faker.address.countryCode('alpha-2')}`,
                                        salesPipeline_projectName:`${faker.name.jobTitle()}`,
                                        salesPipeline_product:`${faker.commerce.product()}`,
                                        salesPipeline_quantity:Number(faker.random.numeric(1)),
                                        salesPipeline_status:`${faker.random.alphaNumeric(5)}`,
                                        salesPipeline_closeDate:new Date().toISOString().slice(0, 19).replace('T', ' '),
                                        salesPipeline_note:`${faker.commerce.productDescription()}`
                                    }
                                }
                            }
                        },
                        salesActivity:{
                            create:{
                                salesActivity_date: new Date(`${faker.date.recent()}`),
                                salesActivity_followup:'phone',
                                salesActivity_jobDesc:`${faker.company.catchPhrase()}`
                            }
                        }
                    },
                },
                Group:{
                    create:{
                        group_name:`${faker.company.companySuffix()}`
                    }
                }

                

                // Quotation:{
                //     create:{
                //         quotation_num:`${faker.random.alphaNumeric(7)}`,
                //         quotation_value:`${faker.commerce.product()}`,
                //         quotation_product:`${faker.commerce.productName()}`,
                //         quotation_quantity:Number(faker.random.numeric(1)),

                //         MOP:{
                //             create:{
                //                 mop_num:`${faker.random.alphaNumeric(7)}`,
                //                 mop_value:`${faker.commerce.product()}`
                //             }
                //         },
                //         SalesPipeline:{
                //             create:{
                //                 salesPipeline_date:`${faker.date.recent()}`,
                //                 salesPipeline_closeEstimation:`${faker.date.recent()}`,
                //                 salesPipeline_salesCode:`${faker.address.countryCode('alpha-2')}`,
                //                 salesPipeline_cust_name:`${faker.name.fullName()}`,
                //                 project_name:`${faker.name.jobTitle()}`,
                //                 product:`${faker.commerce.product()}`,
                //                 quantity:Number(faker.random.numeric(1)),
                //                 Pi_status:`${faker.random.alphaNumeric(5)}`,
                //                 M_num:`${faker.random.alphaNumeric(7)}`,
                //                 close_date:`${faker.date.recent()}`,
                //                 note:`${faker.commerce.productDescription()}`
                //             }
                //         }
                //     }
                // },
                // VerticalMarket:{
                //     create:{
                //         vertical_market:'industry',
                //         Group:{
                //             create:{
                //                 group:`${faker.company.name()}`
                //             }
                //         }
                //     }
                // },
               
                // PIC:{
                //     create:{
                //         P_name:"testing",
                //         P_position: "testing",
                //         P_email:"testing",
                //         P_phone:"testing",
                //         P_sales_code:"testing"
                //     }
                // }
            }
        })
    }
}
// async function main() {
//     await prisma.customer.create({
//         data:{
//             customer_name
//         }
//     })
// }

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
});