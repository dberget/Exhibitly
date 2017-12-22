class SessionsController < ApplicationController
  #  skip_before_action :require_user, e: :new, raise: false
  #  before_action :require_user, only: [:create] 

  def new
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to :samples, notice: "Succesfully logged in!"
    else
      flash.now.alert = "Email or Password invalid"
      render "new"
    end
  end

  def destroy 
    session[:user_id] = nil
    redirect_to root_url, notice: "Logged Out"
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  # def set_session
  #   @session = Session.find(params[:user_id])
  # end

  # Never trust parameters from the scary internet, only allow the white list through.
  # def session_params
  #   params.require(:user).permit(:email, :password)
  # end
end
