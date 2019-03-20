Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :notes
      resources :users
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end


# Imagine we are building out a note sharing application like Evernote.
#
# Since, eventually, our frontend application might be hosted on a specific domain i.e. http://alwaysnote.com, we will want all of our backend routes to be namespaced to indicate they are routes associated with the API.
#
# An example route might look like http://<your-domain>.com/api/v1/notes
