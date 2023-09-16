using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Enums;

namespace Cabeleleila.Domain.ValueObject
{
    public class PaymentMethod
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public bool IsCreditCard {
            get {
                return Id == (int) PaymentMethodTypeEnum.CreditCard;
            }
        }

        public bool IsPIX {
            get {
                return Id == (int) PaymentMethodTypeEnum.PIX;
            }
        }

        public bool IsUndefined {
            get {
                return Id == (int) PaymentMethodTypeEnum.Undefined;
            }
        }
    }
}