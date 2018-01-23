Rails.application.routes.draw do
  resources :presentations
  resources :users
  resources :accounts
  resources :samples
  resources :sessions

  get 'static_pages/home'
  get 'static_pages/about'

  get 'register', to: 'accounts#new', as: 'register'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'share/:presentation_id', to: 'presentation_link#create'
  get 'links', to: 'presentation_link#index'

  get ':share_id', to: 'presentation_link#show'

  root to: "static_pages#home"
end