Rails.application.routes.draw do
  resources :presentations
  resources :users
  resources :accounts
  resources :samples
  resources :sessions
  resources :presentation_links

  get 'static_pages/home'
  get 'static_pages/about'

  get 'register', to: 'accounts#new', as: 'register'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  get 'presentation_links/new/:presentation_id', to: 'presentation_links#new'
  get 'links', to: 'presentation_links#index'
  get ':company/:share_id', to: 'presentation_links#show'  

  root to: "static_pages#home"
end