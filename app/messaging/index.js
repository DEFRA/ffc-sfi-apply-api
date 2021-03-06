const config = require('../config')
const processEligibilityMessage = require('./process-eligibility-message')
const processStandardsMessage = require('./process-standards-message')
const processValidateMessage = require('./process-validate-message')
const processCalculateMessage = require('./process-calculate-message')
const processSubmitMessage = require('./process-submit-message')
const processWithdrawMessage = require('./process-withdraw-message')
const processRequestSBIMessage = require('./process-request-sbi-message')
const { MessageReceiver } = require('ffc-messaging')
let eligibilityReceiver
let standardsReceiver
let validateReceiver
let calculateReceiver
let submitReceiver
let withdrawReceiver
let requestSBIReceiver

async function start () {
  const eligibilityAction = message => processEligibilityMessage(message, eligibilityReceiver)
  eligibilityReceiver = new MessageReceiver(config.eligibilitySubscription, eligibilityAction)
  await eligibilityReceiver.subscribe()

  const standardsAction = message => processStandardsMessage(message, standardsReceiver)
  standardsReceiver = new MessageReceiver(config.standardsSubscription, standardsAction)
  await standardsReceiver.subscribe()

  const validateAction = message => processValidateMessage(message, validateReceiver)
  validateReceiver = new MessageReceiver(config.validateSubscription, validateAction)
  await validateReceiver.subscribe()

  const calculateAction = message => processCalculateMessage(message, calculateReceiver)
  calculateReceiver = new MessageReceiver(config.calculateSubscription, calculateAction)
  await calculateReceiver.subscribe()

  const submitAction = message => processSubmitMessage(message, submitReceiver)
  submitReceiver = new MessageReceiver(config.submitSubscription, submitAction)
  await submitReceiver.subscribe()

  const withdrawAction = message => processWithdrawMessage(message, withdrawReceiver)
  withdrawReceiver = new MessageReceiver(config.withdrawSubscription, withdrawAction)
  await withdrawReceiver.subscribe()

  const requestSBIAction = message => processRequestSBIMessage(message, requestSBIReceiver)
  requestSBIReceiver = new MessageReceiver(config.requestSBISubscription, requestSBIAction)
  await requestSBIReceiver.subscribe()

  console.info('Ready to receive messages')
}

async function stop () {
  await eligibilityReceiver.closeConnection()
  await standardsReceiver.closeConnection()
  await validateReceiver.closeConnection()
  await calculateReceiver.closeConnection()
  await submitReceiver.closeConnection()
  await withdrawReceiver.closeConnection()
  await requestSBIReceiver.closeConnection()
}

module.exports = { start, stop }
