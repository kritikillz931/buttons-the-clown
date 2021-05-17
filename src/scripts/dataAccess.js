const applicationState = {
    clowns: [],
    requests: [],
    completions: []
};

const mainContainer = document.querySelector(".container")

const API = "http://localhost:8088"

// GET FETCH AND SEND CLOWNS

export const getClowns = () => {
    return [...applicationState.clowns]
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
    .then((response) => response.json())
    .then((clownData) => {
        applicationState.clowns = clownData
    })
}

export const sendClowns = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userServiceRequest),
    };
    return fetch(`${API}/clowns`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

// GET SEND FETCH AND DELETE REQUESTS 

export const getRequests = () => {
    
    const requestsWithCompletion = applicationState.requests.map(request => {
        request.completed = !!applicationState.completions.find(c => c.requestId === request.id)
        return request
    })
    
    .sort((c,n) => {
        return c.completed - n.completed
    })
    return requestsWithCompletion
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userServiceRequest),
    };
    
    return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((response) => response.json())
    .then((serviceRequests) => {
      // Store the external state in application state
      applicationState.requests = serviceRequests;
    })}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

// GET FETCH AND SAVE COMPLETIONS 

export const getCompletions = () => {
    return [...applicationState.completions];
  };
  
  export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
      .then((response) => response.json())
      .then((completionData) => {
        // Store the external state in application state
        applicationState.completions = completionData;
      });
  };
  
  export const saveCompletion = (userServiceRequest) => {
    const fetchOptions = {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userServiceRequest),
    };
    return fetch(`${API}/completions`, fetchOptions)
      .then((response) => response.json())
      .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
      });
  };