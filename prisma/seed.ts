import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main(){
    for(let i = 0; i < 100; i++){
        await prisma.customer.create({
            data:{
                cust_name:`${faker.name.fullName()}`,
                cust_code:`dsfkl`,
                sales_code:`${faker.address.countryCode('alpha-2')}`,
                vertical_market:'industry',
                address:`${faker.address.streetAddress()}`,
                province:`${faker.address.country()}`,
                city:`${faker.address.city()}`,
                postal_code:`${faker.address.zipCode()}`,
                cust_phone:`${faker.phone.number('+62 ### ## ##')}`,

                Quotation:{
                    create:{
                        Q_num:`${faker.random.alphaNumeric(7)}`,
                        Q_value:`${faker.commerce.product()}`,
                        product:`${faker.commerce.productName()}`,
                        quantity:Number(faker.random.numeric(1)),

                        MOP:{
                            create:{
                                M_num:`${faker.random.alphaNumeric(7)}`,
                                M_value:`${faker.commerce.product()}`
                            }
                        },
                        SalesPipeline:{
                            create:{
                                date:`${faker.date.recent()}`,
                                close_estimation:`${faker.date.recent()}`,
                                sales_code:`${faker.address.countryCode('alpha-2')}`,
                                cust_name:`${faker.name.fullName()}`,
                                project_name:`${faker.name.jobTitle()}`,
                                product:`${faker.commerce.product()}`,
                                quantity:Number(faker.random.numeric(1)),
                                Pi_status:`${faker.random.alphaNumeric(5)}`,
                                M_num:`${faker.random.alphaNumeric(7)}`,
                                close_date:`${faker.date.recent()}`,
                                note:`${faker.commerce.productDescription()}`
                            }
                        }
                    }
                },
                VerticalMarket:{
                    create:{
                        vertical_market:'industry',
                        Group:{
                            create:{
                                group:`${faker.company.name()}`
                            }
                        }
                    }
                },
                salesActivity:{
                    create:{
                        date:`${faker.date.recent()}`,
                        type_followup:faker.datatype.boolean(),
                        job_desc:`${faker.company.catchPhrase()}`
                    }
                },
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

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
});