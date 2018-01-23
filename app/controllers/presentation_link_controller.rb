class PresentationLinkController < ApplicationController
  before_action :require_user, only: [:index]

    def index
      @links = PresentationLink.all_account_links(@user.account_id)
    end

    def new
    end


    def show
     @presentation_link = PresentationLink.find_by(share_id: params[:share_id])
     @presentation = Presentation.find(@presentation_link.presentation_id)
     @tags = @presentation.samples.map {|s| s.tags}.flatten
    end

    def create
    @presentation_link = PresentationLink.new(presentation_link_params)

    respond_to do |format|
      if @presentation_link.save
      format.html { redirect_to "/#{@presentation_link.share_id}"}
      else
        flash.now.alert = "Error creating link"
        redirect_to :presentations_link
      end
    end
   end

    def destroy
     @presentation_link.destroy

     respond_to do |format|
      format.html { redirect_to presentations_url, notice: 'Sample was successfully destroyed.' }
      format.json { head :no_content }
     end
    end

    private

    def require_user
      redirect_to root_url unless current_user
      @user = current_user
    end

    def presentation_link_params
      params.permit(:presentation_id)
    end
end