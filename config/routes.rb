Rails.application.routes.draw do
  get 'static_pages/home'
  get 'static_pages/about'

  get 'register', to: 'accounts#new', as: 'register'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  resources :users
  resources :accounts
  resources :samples
  resources :sessions


  root to: "static_pages#home"
end
