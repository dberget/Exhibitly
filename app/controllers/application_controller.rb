class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    private
    def current_user
        return unless session[:user_id]
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end 

   
    def logged_in?
        current_user != nil
    end

    helper_method :current_user, :logged_in?
end
