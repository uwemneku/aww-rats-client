import { SurveyFormAction, SurveyFormState, ResponseState } from '~/types';

export const defaultSurveyFormState: SurveyFormState = {
  currentResponse: {
    question_id: -1,
    response_content: '',
  },
  id: -1,
  questions: [],
  responses: [],
  step: 0,
  title: '',
};

const hasExistingResponse = (state: SurveyFormState, question_id: number) =>
  !!state.responses.find((r) => r.question_id === question_id);

const handleNewResponses = (state: SurveyFormState, question_id: number) =>
  !hasExistingResponse(state, question_id)
    ? [...state.responses, state.currentResponse].reduce<ResponseState[]>(
        (acc, curr) =>
          !acc.find((r) => r.question_id === curr.question_id)
            ? [...acc, curr]
            : acc,
        [],
      )
    : [
        ...state.responses.map((response) =>
          response.question_id === state.currentResponse.question_id
            ? state.currentResponse
            : response,
        ),
      ];

const handleResponses = (state: SurveyFormState, question_id: number) =>
  !!state.currentResponse.response_content ||
  hasExistingResponse(state, question_id)
    ? handleNewResponses(state, question_id)
    : state.responses;

const handleSequentialResponse = (newStep: number, state: SurveyFormState) => ({
  question_id: state.questions[newStep]?.id,
  response_content:
    state.responses.find((r) => r.question_id === state.questions[newStep]?.id)
      ?.response_content ?? '',
});

export const surveyFormReducer = (
  state: SurveyFormState,
  action: SurveyFormAction,
): SurveyFormState => {
  switch (action.type) {
    case 'setState':
      return action.payload;
    case 'startSurvey':
      return { ...state, step: 0 };
    case 'nextStep':
      const nextStep = Math.min(state.step + 1, state.questions.length);
      return {
        ...state,
        step: nextStep,
        responses: handleResponses(state, state.questions[state.step]?.id)
          .filter((r) => !!r.response_content)
          .sort((a, b) => (a.question_id ?? 0) - (b.question_id ?? 0)),
        currentResponse: handleSequentialResponse(nextStep, state),
      };
    case 'previousStep':
      const prevStep = Math.max(state.step - 1, 0);
      return {
        ...state,
        step: prevStep,
        responses: handleResponses(state, state.questions[state.step]?.id)
          .filter((r) => !!r.response_content)
          .sort((a, b) => (a.question_id ?? 0) - (b.question_id ?? 0)),
        currentResponse: handleSequentialResponse(prevStep, state),
      };
    case 'updateCurrentResponseFreeForm':
      return {
        ...state,
        currentResponse: {
          ...state.currentResponse,
          response_content: action.payload,
        },
      };
    default:
      return state;
  }
};
