class AccountsController < ApplicationController
        before_action :set_account, only: [:show, :edit, :update, :destroy] 
        before_action :require_user, only: [:edit]
      
        # GET /accounts/1
        # GET /accounts/1.json
        def show
          redirect_to "samples#index"
        end
      
        # GET /accounts/new
        def new
          @account = Account.new
          @user = @account.users.build
        end
      
        # GET /accounts/1/edit
        def edit
        end
      
        # POST /accounts
        # POST /accounts.json
        def create
          @account = Account.new(name: account_params[:name])
      
          respond_to do |format|
            if @account.save
               user = @account.users.build(account_params[:users_attributes])
               if user.save
                session[:user_id] = user.id
                format.html { redirect_to samples_path, notice: 'account was successfully created.' }
                format.json { render samples_path, status: :created, location: @account }
               else
                format.html { redirect_to register_path, notice: 'Error, in user save'  }
                format.json { render json: @account.errors, status: :unprocessable_entity }
               end
            else
              format.html { render :new, notice: 'Error, in account save' }
              format.json { render json: @account.errors, status: :unprocessable_entity }
            end
          end
        end
      
        # PATCH/PUT /accounts/1
        # PATCH/PUT /accounts/1.json
        def update
          respond_to do |format|
            if @account.save
              user = @account.users.build(account_params[:users_attributes])
              if user.save
               session[:user_id] = user.id
               format.html { redirect_to samples_path, notice: 'account was successfully created.' }
               format.json { render samples_path, status: :created, location: @account }
              else
               format.html { redirect_to register_path, notice: 'Error, in user save'  }
               format.json { render json: @account.errors, status: :unprocessable_entity }
              end
           else
             format.html { render :new, notice: 'Error, in account save' }
             format.json { render json: @account.errors, status: :unprocessable_entity }
           end
          end
        end
      
        # DELETE /accounts/1
        # DELETE /accounts/1.json
        def destroy
          @account.destroy
          respond_to do |format|
            format.html { redirect_to accounts_url, notice: 'account was successfully destroyed.' }
            format.json { head :no_content }
          end
        end
      
    private
      def set_account
        @account = Account.find(params[:id])
      end

      def require_user
        redirect_to root_url unless current_user
        @user = current_user
      end
  
      def account_params
        params.require(:account).permit(:name, users_attributes: {})
      end
end
