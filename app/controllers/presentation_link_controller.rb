class PresentationLinkController < ApplicationController

    def new
    end

    def show
     @presentation_link = PresentationLink.find_by(share_id: params[:share_id])
     @presentation = Presentation.find(@presentation_link.presentation_id)
     @account_tags = Sample.account_tags(current_user.account_id)
    end

    def create
    @presentation_link = PresentationLink.new(presentation_link_params)

    respond_to do |format|
      if @presentation_link.save
      format.html { redirect_to "/#{@presentation_link.share_id}", notice: 'url was successfully created.' }
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

    def presentation_link_params
      params.permit(:presentation_id)
    end

    def set_presentation_link
      @presentation_link ||= Presentation.find(params[:id]) if params[:share_id].nil?
    end 
end