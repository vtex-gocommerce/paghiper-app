import * as React from 'react'
import { injectIntl } from 'react-intl'
import { Context } from 'gocommerce.gc-context'
import { PaymentModel } from 'gocommerce.admin-gateway'

interface PaymentFormProps {
  intl: any
}

interface PaymentFormState {}

interface AccountDataInterface {
  accountData: {
    country: string
  }
}

class PaymentFormComponent extends React.PureComponent<PaymentFormProps, PaymentFormState> {
  render() {
    return (
      <Context.AccountContext.Consumer>
        {({ accountData }:AccountDataInterface) => {
          const { country } = accountData
          const { intl } = this.props
          const intlPrefix = 'admin.payment.paghiper'
          const paymentSchema = {
            "title": "PagHiper",
            "properties": {
              "boxGeneral": {
                "title": intl.formatMessage({ id: `${intlPrefix}.boxGeneral` }),
                "id": "general",
                "fields": {
                  "rule.isDefault": {
                    "type": "boolean",
                    "widget": "hidden",
                    "title": "isDefault"
                  },
                  "paymentAlias": {
                    "type": "string",
                    "widget": "hidden",
                    "title": "paymentAlias"
                  },
                  "interestRate": {
                    "type": "string",
                    "widget": "hidden",
                    "title": "interestRate"
                  },
                  "bankInvoiceActive": {
                    "type": "boolean",
                    "widget": "toggle",
                    "title": intl.formatMessage({ id: `${intlPrefix}.bankInvoiceActive` })
                  }
                }
              },
              "boxApplicationSetup": {
                "title": intl.formatMessage({ id: `${intlPrefix}.boxApplicationSetup` }),
                "id": "applicationSetup",
                "fields": {
                  "affiliation.configuration.appKey": {
                    "type": "string",
                    "widget": "text",
                    "title": "appKey",
                    "validate": {
                      "required": true
                    }
                  },
                  "affiliation.configuration.appToken": {
                    "type": "string",
                    "widget": "text",
                    "title": "appToken",
                    "validate": {
                      "required": true
                    }
                  }
                }
              }
            },
            "additionalData": {
              "description": intl.formatMessage({ id: `${intlPrefix}.additionalData.description` })
            },
            "initialValues": {
              "paymentAlias": "paghiper"
            }
          }
          return <PaymentModel payment_id="paghiper" paymentSchema={paymentSchema} />
        }}
      </Context.AccountContext.Consumer>
    )
  }
}

export default injectIntl(PaymentFormComponent)
