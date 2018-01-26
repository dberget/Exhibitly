class PresentationLinksController < ApplicationController
  before_action :require_user, only: [:index, :new]
  # before_action :require_presentation_id, only: [:new]

    def index
      @links = PresentationLink.all_account_links(@user.account_id)
    end

    def new
      @presentation_link = PresentationLink.new
    end


    def show
      @presentation_link = PresentationLink.find_by(share_id: presentation_link_params[:share_id])

     if PresentationLink.expiration_date_valid?(@presentation_link)
      redirect_to :links, notice: 'link has expired'
     else 
      @presentation = Presentation.find(@presentation_link.presentation_id)
      @tags = @presentation.samples.map {|s| s.tags}.flatten
     end
    end

    def create
      @presentation_link = PresentationLink.new(presentation_link_params[:presentation_link])

      if @presentation_link.save
        redirect_to "/#{@presentation_link.company}/#{@presentation_link.share_id}"
      else
        redirect_to :presentations, notice: 'Could not create presentation'
      end
   end

    def destroy
     @presentation_link.destroy

     respond_to do |format|
      format.html { redirect_to presentations_url, notice: 'Link was successfully destroyed.' }
      format.json { head :no_content }
     end
    end

    private

    def require_user
      redirect_to root_url unless current_user
      @user = current_user
    end

    def require_presentation_id
      redirect_to :presentations if presentation_link_params[:presentation_id].nil?
    end

    def presentation_link_params
      params.permit(:presentation_id, :share_id, :company, :presentation_link => {})
    end
end