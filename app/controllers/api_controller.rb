class ApiController < ApplicationController
    protect_from_forgery with: :null_session

        # POST /api
        # POST /api.json
        def create
            puts params[:name]
          @presentation = Presentation.new(name: params[:name], account_id: params[:account_id])
          samples = params[:presentation_samples_attributes][:sample_id]

          respond_to :json
          @presentation.save && update_samples(samples) 
        end
      
        # PATCH/PUT /api/1
        # PATCH/PUT /api/1.json
        def update
            respond_to :json
            @presentation = Presentation.find(params[:id])
            @presentation.update(name: params[:name])
            samples = params[:samples]

            @presentation.save && update_samples(samples) 
        end
      
        # DELETE /presentations/1
        # DELETE /presentations/1.json
        def destroy
          @presentation.destroy
          respond_to do |format|
            format.html { redirect_to presentations_url, notice: 'Presentation was successfully destroyed.' }
            format.json { head :no_content }
          end
        end
      
        private
          # TODO: move to model 
          def update_samples(new_samples)
            old_samples = @presentation.presentation_samples.map {|s| s.sample_id.to_i}
            to_remove = (old_samples - new_samples)
      
            if to_remove
              to_remove.each do |sample_id|
                presentation_sample = @presentation.presentation_samples.find_by(sample_id: sample_id, presentation_id: @presentation.id)
                presentation_sample.destroy
              end 
            end
      
            new_samples.each do |sample_id|
              presentation_sample = @presentation.presentation_samples.find_or_create_by(sample_id: sample_id, presentation_id: @presentation.id)
              presentation_sample.sort_id = new_samples.index(sample_id)
      
              presentation_sample.save
             end 
          end
      
          def api_params
            params.require(:presentation).permit(:name, :account_id, :presentation_samples_attributes => {:sample_id => []})
          end
end
