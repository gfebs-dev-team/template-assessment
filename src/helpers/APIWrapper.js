/*******************************************************************************
 **
 ** Advanced Distributed Learning Co-Laboratory (ADL Co-Lab) grants you
 ** ("Licensee") a non-exclusive, royalty free, license to use and redistribute
 ** this software in source and binary code form, provided that i) this copyright
 ** notice and license appear on all copies of the software; and ii) Licensee
 ** does not utilize the software in a manner which is disparaging to ADL Co-Lab.
 **
 ** This software is provided "AS IS," without a warranty of any kind.  ALL
 ** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
 ** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR
 ** NON-INFRINGEMENT, ARE HEREBY EXCLUDED.  ADL Co-Lab AND ITS LICENSORS SHALL
 ** NOT BE LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 ** MODIFYING OR DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES.  IN NO EVENT WILL
 ** ADL Co-Lab OR ITS LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA,
 ** OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 ** DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING
 ** OUT OF THE USE OF OR INABILITY TO USE SOFTWARE, EVEN IF ADL Co-Lab HAS BEEN
 ** ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 **
 *******************************************************************************/

/*******************************************************************************
 **
 ** This file is being presented to Content Developers, Content Programmers and
 ** Instructional Designers to demonstrate one way to abstract API calls from the
 ** actual content to allow for uniformity and reuse of content fragments.
 **
 ** The purpose in wrapping the calls to the API is to (1) provide a
 ** consistent means of finding the LMS API adapter within the window
 ** hierarchy, (2) to ensure that the method calls are called correctly by the
 ** SCO and (3) to make possible changes to the actual API Specifications and
 ** Standards easier to implement/change quickly.
 **
 ** This is just one possible example for implementing the API guidelines for
 ** runtime communication between an LMS and executable content components.
 ** There are many other possible implementations.
 **
 *******************************************************************************/

// local variable definitions used for finding the API
let apiHandle = null
let findAPITries = 0
let noAPIFound = 'false'

// local variable used to keep from calling Terminate() more than once
let terminated = 'false'

// local variable used by the content developer to debug
// This should be set to true during development to find errors.  However,
// This should be set to false prior to deployment.
const _debug = false

/*******************************************************************************
 **
 ** This function looks for an object named API in parent and opener windows
 **
 ** Inputs:  Object - The Window Object
 **
 ** Return:  Object - If the API object is found, it's returned, otherwise null
 **          is returned
 **
 *******************************************************************************/
function findAPI(win) {
  while (win.API_1484_11 == null && win.parent != null && win.parent != win) {
    findAPITries++

    if (findAPITries > 500) {
      alert('Error finding API -- too deeply nested.')
      return null
    }

    win = win.parent
  }

  return win.API_1484_11
}

/*******************************************************************************
 **
 ** This function looks for an object named API, first in the current window's
 ** frame hierarchy and then, if necessary, in the current window's opener window
 ** hierarchy (if there is an opener window).
 **
 ** Inputs:  none
 **
 ** Return:  Object - If the API object is found, it's returned, otherwise null
 **                   is returned
 **
 *******************************************************************************/
function getAPI() {
  let theAPI = findAPI(window)

  if (theAPI == null && window.opener != null && typeof window.opener != 'undefined') {
    theAPI = findAPI(window.opener)
  }

  if (theAPI == null) {
    alert(
      "Unable to locate the LMS's API Implementation.\n" +
        'Communication with the LMS will not occur.'
    )

    noAPIFound = 'true'
  }

  return theAPI
}

/*******************************************************************************
 **
 ** Returns the handle to API object if it was previously set, otherwise it
 ** returns null
 **
 ** Inputs:  None
 **
 ** Return:  Object - The value contained by the apiHandle variable.
 **
 *******************************************************************************/
function getAPIHandle() {
  if (apiHandle == null) {
    if (noAPIFound == 'false') {
      apiHandle = getAPI()
    }
  }

  return apiHandle
}

/*******************************************************************************
 **
 ** This function is used to tell the LMS to initiate the communication session.
 **
 ** Inputs:  None
 **
 ** Return:  String - "true" if the initialization was successful, or
 **          "false" if the initialization failed.
 **
 *******************************************************************************/
function initializeCommunication() {
  console.log('This function ran')
  const api = getAPIHandle()
  let result

  if (api == null) {
    return 'false'
  } else {
    result = api.Initialize('')

    if (result != 'true') {
      const errCode = retrieveLastErrorCode()

      displayErrorInfo(errCode)

      // may want to do some error handling
    }
  }

  return result
}

/*******************************************************************************
 **
 ** This function is used to tell the LMS to terminate the communication session
 **
 ** Inputs:  None
 **
 ** Return:  String - "true" if successful or
 **                   "false" if failed.
 **
 *******************************************************************************/
function terminateCommunication() {
  const api = getAPIHandle()

  if (api == null) {
    return 'false'
  } else {
    // call Terminate only if it was not previously called
    if (terminated != 'true') {
      // call the Terminate function that should be implemented by
      // the API
      const result = api.Terminate('')

      if (result != 'true') {
        const errCode = retrieveLastErrorCode()

        displayErrorInfo(errCode)

        // may want to do some error handling
      } // terminate was successful
      else {
        terminated = 'true'
      }
    }
  }

  return result
}

/*******************************************************************************
 **
 ** This function requests information from the LMS.
 **
 ** Inputs:  String - Name of the data model defined category or element
 **                   (e.g. cmi.core.learner_id)
 **
 ** Return:  String - The value presently assigned to the specified data model
 **                   element.
 **
 *******************************************************************************/
function retrieveDataValue(name) {
  // do not call a set after finish was called
  if (terminated != 'true') {
    const api = getAPIHandle()

    if (api == null) {
      return ''
    } else {
      const value = api.GetValue(name)

      const errCode = api.GetLastError()

      if (errCode != '0') {
        const errCode = retrieveLastErrorCode()

        displayErrorInfo(errCode)
      } else {
        return value
      }
    }
  }

  return
}

/*******************************************************************************
 **
 ** This function is used to tell the LMS to assign the value to the named data
 ** model element.
 **
 ** Inputs:  String - Name of the data model defined category or element value
 **
 **          String - The value that the named element or category will be
 **                   assigned
 **
 ** Return:  String - "true" if successful or
 **                   "false" if failed.
 **
 *******************************************************************************/
function storeDataValue(name, value) {
  // do not call a set after finish was called
  if (terminated != 'true') {
    const api = getAPIHandle()

    if (api == null) {
      return
    } else {
      const result = api.SetValue(name, value)

      if (result != 'true') {
        const errCode = retrieveLastErrorCode()

        displayErrorInfo(errCode)

        // may want to do some error handling
      }
    }
  }

  return
}

/*******************************************************************************
 **
 ** This function requests the error code for the current error state from the
 ** LMS.
 **
 ** Inputs:  None
 **
 ** Return:  String - The last error code.
 **
 *******************************************************************************/
function retrieveLastErrorCode() {
  // It is permitted to call GetLastError() after Terminate()

  const api = getAPIHandle()

  if (api == null) {
    return ''
  } else {
    return api.GetLastError()
  }
}

/*******************************************************************************
 **
 ** This function requests a textual description of the current error state from
 ** the LMS
 **
 ** Inputs:  String - The error code.
 **
 ** Return:  String - Textual description of the given error state.
 **
 *******************************************************************************/
function retrieveErrorInfo(errCode) {
  // It is permitted to call GetLastError() after Terminate()

  const api = getAPIHandle()

  if (api == null) {
    return ''
  } else {
    return api.GetErrorString(errCode)
  }
}

/*******************************************************************************
 **
 ** This function requests additional diagnostic information about the given
 ** error code.  This information is LMS specific, but can help a developer find
 ** errors in the SCO.
 **
 ** Inputs:  String - The error code.
 **
 ** Return:  String - Additional diagnostic information about the given error
 **                   code
 **
 *******************************************************************************/
function retrieveDiagnosticInfo(error) {
  // It is permitted to call GetLastError() after Terminate()

  const api = getAPIHandle()

  if (api == null) {
    return ''
  } else {
    return api.GetDiagnostic(error)
  }
}

/*******************************************************************************
 **
 ** This function requests that the LMS persist all data to this point in the
 ** session.
 **
 ** Inputs:  None
 **
 ** Return:  None
 **
 *******************************************************************************/
function persistData() {
  // do not call a set after Terminate() was called
  if (terminated != 'true') {
    const api = getAPIHandle()

    if (api == null) {
      return ''
    } else {
      return api.Commit('')
    }
  } else {
    return ''
  }
}

/*******************************************************************************
 **
 ** Display the last error code, error description and diagnostic information.
 **
 ** Inputs:  String - The error code
 **
 ** Return:  None
 **
 *******************************************************************************/
function displayErrorInfo(errCode) {
  if (_debug) {
    const errString = retrieveErrorInfo(errCode)
    const errDiagnostic = retrieveDiagnosticInfo(errCode)

    alert('ERROR: ' + errCode + ' - ' + errString + '\n' + 'DIAGNOSTIC: ' + errDiagnostic)
  }
}

// Track initialized status so it is only called once
let alreadyInitialized = false

let startTime
let endTime

function CallInitialize() { 
  if (!alreadyInitialized) {
    initializeCommunication()
    alreadyInitialized = true
  }
}

/*******************************************************************************
 **
 ** This function sets the state of the sco.
 **
 ** Inputs:  None
 **
 ** Return:  None
 **
 *******************************************************************************/
function Initialize() {
  // make initialize call
  CallInitialize()

  // set completion status to incomplete
  SetIncomplete()

  // set exit to suspended
  storeDataValue('cmi.exit', 'suspend')

  // check for resumed entry state
  const entryMode = retrieveDataValue('cmi.entry')

  // set a local variable to page 1

  startTime = new Date()

  // check whether resuming SCO
  if (entryMode == 'resume') {
    // check if a prior location was set

    // get the Error code from the last call
    const errorCode = retrieveLastErrorCode()
    console.log(errorCode)

    //Save route and state for bookmark
  }
  // present page to learner
  console.log('Initialized')
}

function Terminate() {
  if (retrieveDataValue('cmi.completion_status') == 'incomplete') {
    storeDataValue('cmi.success_status', 'unknown')
    storeDataValue('adl.nav.request', 'suspendAll')
  } else {
    storeDataValue('cmi.success_status', 'passed')
  }
  terminateCommunication()
}

function doExit() {
  endTime = new Date()
  const totalMilliseconds = endTime.getTime() - startTime.getTime()
  const scormTime = ConvertMilliSecondsIntoSCORM2004Time(totalMilliseconds)

  storeDataValue('cmi.session_time', scormTime)
  storeDataValue('cmi.exit', 'normal')
  storeDataValue('adl.nav.request', 'exitAll')
  persistData()

  Terminate()
  console.log('Did Exit')
}

/*******************************************************************************
 **
 ** Sets the SCO completion status to incomplete.
 **
 ** Inputs:  None
 **
 ** Return:  None
 **
 *******************************************************************************/
function SetIncomplete() {
  const status = retrieveDataValue('cmi.completion_status')
  if (status != 'completed') {
    storeDataValue('cmi.completion_status', 'incomplete')
  }
}

/*******************************************************************************
 **
 ** Sets the SCO completion status to complete.
 **
 ** Inputs:  None
 **
 ** Return:  None
 **
 *******************************************************************************/
function SetComplete() {
  storeDataValue('cmi.completion_status', 'completed')
  console.log('Set Complete')
}

function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds) {
  let ScormTime = ''

  let HundredthsOfASecond //decrementing counter - work at the hundreths of a second level because that is all the precision that is required

  //let Seconds;	// 100 hundreths of a seconds
  //let Minutes;	// 60 seconds
  //let Hours;		// 60 minutes
  //let Days;		// 24 hours
  //let Months;		// assumed to be an "average" month (figures a leap year every 4 years) = ((365*4) + 1) / 48 days - 30.4375 days per month
  //let Years;		// assumed to be 12 "average" months

  const HUNDREDTHS_PER_SECOND = 100
  const HUNDREDTHS_PER_MINUTE = HUNDREDTHS_PER_SECOND * 60
  const HUNDREDTHS_PER_HOUR = HUNDREDTHS_PER_MINUTE * 60
  const HUNDREDTHS_PER_DAY = HUNDREDTHS_PER_HOUR * 24
  const HUNDREDTHS_PER_MONTH = HUNDREDTHS_PER_DAY * ((365 * 4 + 1) / 48)
  const HUNDREDTHS_PER_YEAR = HUNDREDTHS_PER_MONTH * 12

  HundredthsOfASecond = Math.floor(intTotalMilliseconds / 10)

  const Years = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_YEAR)
  HundredthsOfASecond -= Years * HUNDREDTHS_PER_YEAR

  const Months = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MONTH)
  HundredthsOfASecond -= Months * HUNDREDTHS_PER_MONTH

  const Days = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_DAY)
  HundredthsOfASecond -= Days * HUNDREDTHS_PER_DAY

  const Hours = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_HOUR)
  HundredthsOfASecond -= Hours * HUNDREDTHS_PER_HOUR

  const Minutes = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MINUTE)
  HundredthsOfASecond -= Minutes * HUNDREDTHS_PER_MINUTE

  const Seconds = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_SECOND)
  HundredthsOfASecond -= Seconds * HUNDREDTHS_PER_SECOND

  if (Years > 0) {
    ScormTime += Years + 'Y'
  }
  if (Months > 0) {
    ScormTime += Months + 'M'
  }
  if (Days > 0) {
    ScormTime += Days + 'D'
  }

  //check to see if we have any time before adding the "T"
  if (HundredthsOfASecond + Seconds + Minutes + Hours > 0) {
    ScormTime += 'T'

    if (Hours > 0) {
      ScormTime += Hours + 'H'
    }

    if (Minutes > 0) {
      ScormTime += Minutes + 'M'
    }

    if (HundredthsOfASecond + Seconds > 0) {
      ScormTime += Seconds

      if (HundredthsOfASecond > 0) {
        ScormTime += '.' + HundredthsOfASecond
      }

      ScormTime += 'S'
    }
  }

  if (ScormTime == '') {
    ScormTime = '0S'
  }

  ScormTime = 'P' + ScormTime

  return ScormTime
}

export {
  initializeCommunication,
  terminateCommunication,
  retrieveDataValue,
  storeDataValue,
  retrieveDiagnosticInfo,
  retrieveErrorInfo,
  retrieveLastErrorCode,
  persistData,
  displayErrorInfo,
  Initialize,
  Terminate,
  doExit,
  SetComplete,
  SetIncomplete
}
